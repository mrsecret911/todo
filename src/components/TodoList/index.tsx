import React, { 
  useCallback,
  useState,
  useRef,
  SyntheticEvent,
  ChangeEvent,
  memo
} from 'react';
import './TodoList.scss';
import { useAppContext } from '../../context/AppContext';
import TodoItem from '../TodoItem';

const TodoList = () => {
  const [{ todos }, setStore] = useAppContext();
  const todoInput = useRef<HTMLInputElement>(null);
  const [filter, updateFilter] = useState('all');

  const addTodo = useCallback((event: SyntheticEvent):void => {
    event.preventDefault();
    if (!todoInput.current) return;
    
    const inputValue = todoInput.current.value;
    if (inputValue) {
      setStore({ todos: [
        ...todos,
        { text: inputValue, checked: false, id: todos.length }
      ]});
    }
    todoInput.current.value = '';
  }, [todos]);

  const onCheck = useCallback((id: number):void => {
    setStore({ todos: todos.map(todo => 
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )});
  }, [todos]);

  const onFilter = useCallback((event: ChangeEvent<HTMLInputElement>):void => {
    updateFilter(event.target.value);
  }, [todos]);

  const getFilteredItems = useCallback(() => {
    switch(filter) {
      case 'done':
        return todos.filter(todo => todo.checked);
      case 'undone':
        return todos.filter(todo => !todo.checked);
      default:
        return todos;
    }

  }, [todos, filter]);

  const isChecked = useCallback((value: string): boolean => value === filter, [filter]);

  return (
    <div className='todo-list'>
        <div className='todo-list__filter' onChange={onFilter}>
          {['all', 'done', 'undone'].map(value => 
            <label><input type='radio' name="filter" value={value} checked={isChecked(value)} /> {value}</label>  
          )}
        </div>
        {getFilteredItems().map(({ text, checked, id}) => 
          <TodoItem text={text} checked={checked} id={id} onCheck={onCheck} key={id} />)
        }
        <div className='todo-list__form'>
          <form onSubmit={addTodo}>
            <input type='text' ref={todoInput} />
            <button>Add Todo</button>
          </form>
        </div>
    </div>
  );
}

export default memo(TodoList);
