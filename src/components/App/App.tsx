/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';

import { AuthContext } from '../Auth/AuthContext';
import { Todo } from '../../types/Todo';
import * as Api from '../../api/todos';
import { FilterBy } from '../../types/FilterBy';
import { TodoList } from '../TodoList/TodoList';
import { Footer } from '../Footer/Footer';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [showFooter, setShowFooter] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [error, setError] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      Api.getTodos(user.id)
        .then(data => {
          setTodoList(data);

          if (data.length) {
            setShowFooter(true);
          }
        })
        .catch(() => {
          setError('Error 404');
          setTimeout(() => setError(''), 3000);
        });
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todoList && (
          <TodoList
            todoList={todoList}
            filterBy={filterBy}
          />
        )}

        {showFooter && (
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      {error && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setError('')}
          />
          {error}
        </div>
      )}
    </div>
  );
};
