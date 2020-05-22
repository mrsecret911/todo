import React, { FC, memo } from 'react';
import './TodoItem.scss';

interface Props {
  text: string,
  checked: boolean,
  id: number,
  onCheck: (id: number) => void
}

const TodoItem: FC<Props> = ({ text, checked, id, onCheck }) => {
  return (
    <label className='todo-item'>
      <input type="checkbox" onChange={() => onCheck(id)} checked={checked} />
      <span>{text}</span>
    </label>
  );
}

export default memo(TodoItem);
