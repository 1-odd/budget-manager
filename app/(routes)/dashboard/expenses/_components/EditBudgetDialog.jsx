'use client'
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { updateSelectedBudget } from "../_actions/expense";
import { toast } from "sonner";

const EditBudgetDialog = ({budgetInfo,refreshData}) => {
    
  const [emoji, setEmoji] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

useEffect(() => {
    
    setEmoji(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);

}, [budgetInfo])

    

  const updateBudget = async ()=>{
    const budgetId = parseInt(budgetInfo?.id)
    const result = await updateSelectedBudget(name,amount,emoji,budgetId);
    if(result){
        refreshData()
      toast.success("Budget updated successfully");
      
    }
    
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" flex gap-2">
            Update Budget
            <PenBox />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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

                <div className=" absolute z-20">
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
                    Budget's New Name
                  </h2>
                  <Input 
                    defaultValue = {budgetInfo?.name}
                    placeholder="e.g. Office salary"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3">
                  <h2 className=" text-black font-md my-2 font-bold ">
                    Budget's New Amount
                  </h2>
                  <Input
                  defaultValue={budgetInfo?.amount}
                    type="number"
                    placeholder=" ₹ 123"
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
                onClick={() => updateBudget()}
                className=" mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudgetDialog;
