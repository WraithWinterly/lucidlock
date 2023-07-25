import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";

export default function Modal({
  shown,
  setShown,
  title,
  children,
}: {
  shown: boolean;
  setShown: Dispatch<SetStateAction<boolean>>;
  title?: string | undefined;
  children: ReactNode;
}) {
  function closeModal() {
    setShown(false);
  }

  function openModal() {
    setShown(true);
  }

  return (
    <>
      <Transition appear show={shown} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-violet-900/50 p-6 text-left align-middle shadow-xl backdrop-blur-md transition-all">
                  {title && (
                    <Dialog.Title
                      as="h2"
                      className="text-2xl font-semibold leading-6 text-gray-200"
                    >
                      {title}
                    </Dialog.Title>
                  )}

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
