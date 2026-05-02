import React from 'react';
import { AlertDialogAction, AlertDialogOverlay, AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { VisuallyHidden } from 'radix-ui';

interface AlertProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    contentChildren: React.ReactNode
    header?: string;
}
const Alert = ({ open, setOpen, contentChildren, header }: AlertProps) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            <AlertDialogTrigger asChild />
            <AlertDialogDescription> {null} </AlertDialogDescription>
            <AlertDialogContent
                className='outline-none border-none  flex-1 rounded-2xl w-[60%]    max-w-full flex flex-col '
            >
                <AlertDialogTitle>
                    <span className='font-medium text-zinc-800 text-[17px]'> {header} </span>
                </AlertDialogTitle>

                {contentChildren}
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Alert;
