import React, { useEffect, useState } from 'react';
import * as Y from 'yjs';

interface EditableTextProps {
  ytext: Y.Text;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ ytext, className }) => {
  const [text, setText] = useState(ytext.toString());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const updateText = () => setText(ytext.toString());
    ytext.observe(updateText);
    return () => ytext.unobserve(updateText);
  }, [ytext]);

  const applyTextChange = (ytext: Y.Text, newValue: string) => {
    const oldValue = ytext.toString();

    // Simple diff: find where they differ
    let start = 0;
    while (start < Math.min(oldValue.length, newValue.length) &&
      oldValue[start] === newValue[start]) {
      start++;
    }

    // Find common suffix
    let oldEnd = oldValue.length;
    let newEnd = newValue.length;,
    while (oldEnd > start && newEnd > start &&
      oldValue[oldEnd - 1] === newValue[newEnd - 1]) {
      oldEnd--;
      newEnd--;
    }

    // Apply operations
    if (oldEnd > start) {
      ytext.delete(start, oldEnd - start);  // Delete changed part
    }
    if (newEnd > start) {
      ytext.insert(start, newValue.slice(start, newEnd));  // Insert new part
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    if (isEditing) {
      applyTextChange(ytext, newText);
    }
  };

  return (
    <input
      value={text}
      onChange={handleChange}
      onFocus={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      className={className}
    />
  );
};

export default EditableText;
