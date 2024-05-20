"use client";
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewBudget } from "../_actions/budget";
import { toast } from "sonner";

const CreateBudget = () => {
  const [emoji, setEmoji] = useState("😐");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleNewCreateBudget = async () => {
    const res = await createNewBudget(name, amount, emoji);
    if (res) {
      toast("New Budget Created!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className=" bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed
       cursor-pointer hover:shadow-md "
          >
            <h2 className=" text-3xl">+</h2>
            <h2 className="">Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className=" mt-5">
                <Button
                  className=" text-lg"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setOpenEmojiPicker(!openEmojiPicker);
                  }}
                >
                  {emoji}
                </Button>

                <div className=" absolute">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>

                <div className="mt-3">
                  <h2 className=" text-black font-md my-2 font-bold ">
                    Budget Name
                  </h2>
                  <Input
                    placeholder="e.g. Office salary"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3">
                  <h2 className=" text-black font-md my-2 font-bold ">
                    Budget Amount
                  </h2>
                  <Input
                    type="number"
                    placeholder=" $ 123"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>

               
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
            <Button
                  onClick={() => handleNewCreateBudget()}
                  className=" mt-5 w-full"
                >
                  Create Budget
                </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
