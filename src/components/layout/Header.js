import React, { useState } from 'react';
import { FaPizzaSlice } from "react-icons/fa";
import { AddTask } from "../AddTask";

export const Header = ({darkMode, setDarkMode}) => {

    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [showQuickAddTask, setShowQuickAddTask] = useState(false);

    return (
        <header className='header' data-testid="header">
            <nav>
                <div className="logo">
                    <img src="/images/logo.png" alt="Todoist"/>
                </div>
                <div className="settings">
                    <ul>
                        <li className='settings__add'>
                            <button
                                data-testid="quick-add-task-action"
                                aria-label="Quick add task"
                                onClick={() => {
                                    setShowQuickAddTask(true);
                                    setShouldShowMain(true);
                                }}
                                onKeyPress={e => {
                                    if (e.key === 'Space') {
                                        setShowQuickAddTask(true);
                                        setShouldShowMain(true);
                                    }
                                }}
                                type="button"
                            >
                                +
                            </button>
                        </li>
                        <li className='settings__darkmode'>
                            <button
                                tabIndex={0}
                                data-testid="dark-mode-action"
                                aria-label="Darkmode on/off"
                                onClick={() => setDarkMode(!darkMode)}
                                onKeyPress={e => {
                                    if (e.key === "Space") {
                                        setDarkMode(!darkMode);
                                    }
                                }}
                                type="button"
                            >
                                <FaPizzaSlice/>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <AddTask
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />
        </header>
    );
};
