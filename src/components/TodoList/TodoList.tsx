import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  todoList: Todo[];
  filterBy: FilterBy;
};

export const TodoList: React.FC<Props> = ({ todoList, filterBy}) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    switch (filterBy) {
      case FilterBy.Completed:
        setVisibleTodos(todoList.filter(todo => {
          return todo.completed;
        }));
        break;

      case FilterBy.Active:
        setVisibleTodos(todoList.filter(todo => {
          return !todo.completed;
        }));
        break;

      default:
        setVisibleTodos(todoList);
    }
  }, [filterBy]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo) => (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: todo.completed,
          })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
