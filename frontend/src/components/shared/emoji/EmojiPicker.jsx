import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function EmojiPicker({ onEmojiSelect }) {
  return (
    <div>
      <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        emojiSize={20}
        emojiButtonSize={25}
        autoFocus={true}
        skin={4}
      />
    </div>
  );
}

export default EmojiPicker;
