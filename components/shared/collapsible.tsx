import React from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

interface CollapsibleProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    buttonChildren: React.ReactNode;
    contentChildren: React.ReactNode
}

const CollapsibleAction = ({ open, setOpen, buttonChildren, contentChildren }: CollapsibleProps) => {
    return (
        <Collapsible open={open} onOpenChange={setOpen} className='rounded-md bg-white'>
            <CollapsibleTrigger asChild >
                {buttonChildren}
            </CollapsibleTrigger>
            <CollapsibleContent className='px-4  w-full'>
                {contentChildren}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CollapsibleAction
