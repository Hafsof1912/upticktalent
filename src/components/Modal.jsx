// src/components/Modal.tsx
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <Transition show={isOpen}>
            <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={onClose}
            >
            <div className="flex align-middle min-h-screen px-4 text-center">
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>

                    <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <div className="w-full max-w-md p-6 mx-auto my-auto overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:bg-boxdark dark:drop-shadow-none rounded-lg">
                        {children}
                    </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;