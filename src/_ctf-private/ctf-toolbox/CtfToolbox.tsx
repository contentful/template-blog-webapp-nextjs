import { useRouter } from 'next/router';
import React, { ChangeEvent, HTMLProps, ReactNode, useEffect, useRef, useState } from 'react';

import ContentfulIcon from '@icons/contentful.svg';
import {
  ContentfulParams,
  guestSpaceOptionalParameters,
  guestSpaceRequiredParameters,
  useContentfulEditorialStore,
} from '@src/_ctf-private';
import typewriter from 'analytics';

const ParamToggle = ({
  label,
  id,
  helpText,
  ...rest
}: HTMLProps<HTMLInputElement> & {
  label: ReactNode;
  helpText: ReactNode;
}) => {
  return (
    <div className="mb-6 flex w-full flex-col">
      <div className="flex-1">
        <label htmlFor={id} className="h4 mb-0 flex items-center justify-between">
          {label}
          <input type="checkbox" id={id} {...rest} className="h-6 w-6" />
        </label>
        <p className="mt-3 pr-16 text-gray500">{helpText}</p>
      </div>
    </div>
  );
};

const ParamInput = ({
  label,
  ...props
}: HTMLProps<HTMLInputElement> & {
  label: ReactNode;
}) => {
  return (
    <div className="mb-4 flex w-full flex-col ">
      <label htmlFor={props.id} className="h4">
        {label}
      </label>
      <input className="mt-1 h-10 rounded-md border border-gray200 px-4" id={props.id} {...props} />
    </div>
  );
};

export const CtfToolbox = () => {
  const toolboxRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [toolboxOpen, setToolboxOpen] = useState(false);

  const router = useRouter();
  const { xray, preview, space_id, preview_token, delivery_token } = useContentfulEditorialStore();

  const activeGuestSpace = !!space_id && !!preview_token && !!delivery_token;

  const handleToolboxInteraction = (isOpen?: boolean) => {
    setToolboxOpen(currentState => {
      typewriter.toolboxInteracted({ isOpen: isOpen || !currentState });

      return isOpen || !currentState;
    });
  };

  const handlePreviewMode = (e: ChangeEvent<HTMLInputElement>) => {
    typewriter.previewModeInteracted({
      enabled: e.target.checked,
    });

    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        [ContentfulParams.preview]: e.target.checked,
      },
    });
  };

  const handleXrayMode = (e: ChangeEvent<HTMLInputElement>) => {
    typewriter.xrayModeInteracted({
      enabled: e.target.checked,
    });

    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        [ContentfulParams.xray]: e.target.checked,
      },
    });
  };

  const handleReset = async () => {
    // Pass the reset parameter, which clears the persisted store
    await router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        [ContentfulParams.reset]: true,
      },
    });
    // Remove the reset parameter, since we no longer need it
    await router.replace({
      pathname: router.pathname,
      query: {
        slug: router.query.slug,
      },
    });
    // Reload the page to fetch serverside data
    router.reload();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = [...data.entries()].reduce(
      (acc, [key, val]) => {
        if (val.length > 0) {
          acc[key] = String(val);
        } else {
          delete acc[key];
        }

        return acc;
      },
      { ...router.query },
    );

    await router.replace({
      pathname: router.pathname,
      query: {
        ...dataObj,
      },
    });
    router.reload();
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (event.target === buttonRef.current || buttonRef.current?.contains(event.target)) return;

      if (toolboxRef.current && !toolboxRef.current.contains(event.target)) {
        handleToolboxInteraction(false);
      }
    };

    const handleEscape = event => {
      if (event.key === 'Escape') {
        handleToolboxInteraction(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleEscape, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscape, true);
    };
  }, []);

  if (!activeGuestSpace && process.env.ENVIRONMENT_NAME === 'production') return null;

  return (
    <div className="fixed bottom-12 right-12 z-50 flex w-full max-w-[500px]">
      <button
        title="Toggle the Contentful toolbox"
        ref={buttonRef}
        onClick={() => handleToolboxInteraction()}
        className="ml-auto h-14 w-14 rounded-full bg-gray800 p-2 shadow-md">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-7 w-7 -translate-y-[1px] -translate-x-[1px]">
            <ContentfulIcon />
          </div>
        </div>
      </button>

      {toolboxOpen && (
        <div
          ref={toolboxRef}
          className="absolute right-0 bottom-20 max-h-[70vh] overflow-auto bg-colorWhite shadow-md">
          <div className="flex bg-gray800 py-6 px-4 lg:py-8 lg:px-6">
            <div className="h-7 w-7">
              <ContentfulIcon />
            </div>
            <h2 className="h3 ml-3 text-colorWhite">Editorial Toolbox</h2>
          </div>
          <div className="py-4 px-4 md:px-6">
            <h3>General settings</h3>
            <hr className="my-4 text-gray300" />
            <ParamToggle
              id="preview-mode"
              label="Preview mode"
              helpText="View draft entries, assets and unpublished content changes."
              checked={preview}
              onChange={handlePreviewMode}
            />
            <ParamToggle
              id="xray-mode"
              label="X-ray mode"
              helpText="Highlight components making up a page and provide a deep link to the entry editor."
              checked={xray}
              onChange={handleXrayMode}
            />
            {process.env.ENVIRONMENT_NAME !== 'production' && (
              <>
                <div className="mb-6">
                  <h3>Guest space parameters</h3>
                  <hr className="my-4 text-gray300" />

                  <form onSubmit={handleSubmit}>
                    {[...guestSpaceRequiredParameters, ...guestSpaceOptionalParameters].map(
                      param => {
                        const queryParam = useContentfulEditorialStore.getState()[param];

                        return (
                          <ParamInput
                            required
                            label={param}
                            name={param}
                            defaultValue={queryParam}
                            key={param}
                          />
                        );
                      },
                    )}
                    <button type="submit" className="rounded-md bg-gray200 px-4 py-2 font-bold">
                      Submit
                    </button>
                  </form>
                </div>
                <div>
                  <h3>Reset</h3>
                  <hr className="my-4 text-gray300" />

                  <div className="mb-6 flex w-full">
                    <div className="flex flex-1 flex-col pr-6">
                      <label htmlFor="reset" className="h4 mb-0 mr-auto">
                        Reset editorial settings
                      </label>
                      <span className="text-gray500">
                        Reset the guest space functionality, x-ray and preview-mode
                      </span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="mb-auto rounded-md bg-gray200 px-4 py-2 font-bold">
                      Reset
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
