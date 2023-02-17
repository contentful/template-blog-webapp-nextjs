require('dotenv').config();

const fs = require('fs');

const yaml = require('js-yaml');

const config = {
  typewriterFile: './typewriter.yml',
  typewriterExampleFile: './typewriter.example.yml',
};

const updateTrackingPlan = doc => {
  console.log('Attempting to update tracking plan');

  if (!doc.trackingPlans?.[0]?.id) {
    throw new Error('Malformed typewriter config');
  }

  if (!process.env.SEGMENT_TRACKINGPLAN_ID) {
    throw new Error('Required environment SEGMENT_TRACKINGPLAN_ID variable is missing');
  }

  if (doc.trackingPlans[0].id !== process.env.SEGMENT_TRACKINGPLAN_ID) {
    doc.trackingPlans[0].id = process.env.SEGMENT_TRACKINGPLAN_ID;

    fs.writeFile(config.typewriterFile, yaml.dump(doc), err => {
      if (err) throw err;
    });

    console.log('Successfully created typewriter config');
  } else {
    console.log('Tracking plan already correctly configured');
  }
};

try {
  const doc = yaml.load(fs.readFileSync(config.typewriterFile, 'utf8'));

  console.log('Typewriter config exists -- continuing to update');

  updateTrackingPlan(doc);
} catch {
  console.log('Typewriter config does not exist -- creating config from template');
  fs.copyFile(config.typewriterExampleFile, config.typewriterFile, err => {
    if (err) throw err;

    const doc = yaml.load(fs.readFileSync(config.typewriterFile, 'utf8'));

    console.log('Typewriter config created -- continuing to update');
    updateTrackingPlan(doc);
  });
}
