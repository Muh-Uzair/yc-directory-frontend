import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { signoutAction } from "./sign-out-action";
// import LoadingSpinner from "@/components/LoadingSpinner";

interface ILogoutConfirmDialog {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignoutConfirmDialog: React.FC<ILogoutConfirmDialog> = ({
  open,
  onOpenChange,
}) => {
  // VARS

  // FUNCTIONS
  const signoutConfirm = async () => {
    await signoutAction();
    onOpenChange(false);
  };

  // JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Confirm Sign out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out? You will need to sign in again to
            access your dashboard.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="w-auto">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={signoutConfirm}>
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignoutConfirmDialog;
