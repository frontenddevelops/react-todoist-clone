import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";

export const AddTask = ({
                            showAddTaskMain = true,
                            shouldShowMain = false,
                            showQuickAddTask,
                            setShowQuickAddTask,
                        }) => {

    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [project, setProject] = useState('');
    const [showMain, setShowMain] = useState(shouldShowMain);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate, setShowTaskDate] = useState(false);

    const {selectedProject} = useSelectedProjectValue();

    const addTask = () => {
        const projectId = project || selectedProject;
        let collatedDate = '';

        if (projectId === 'TODAY') {
            collatedDate = moment().format('DD/MM/YYYY');
        } else if (projectId === 'NEXT_7') {
            collatedDate = moment()
                .add(7, 'days')
                .format('DD/MM/YYYY');
        }
        return (task && project &&
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived: false,
                    projectId,
                    task,
                    date: collatedDate || taskDate,
                    userId: '1',
                })
                .then(() => {
                    setTask('');
                    setProject('');
                    setShowMain(false);
                    setShowProjectOverlay(false);
                })

        );
    };

    return (
        <div
            className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
            data-testid='add-task-comp'
        >
            {showAddTaskMain && (
                <div
                    className="add-task__shallow"
                    data-testid='show-main-action'
                    onClick={() => setShowMain(!showMain)}
                    onKeyPress={e => {
                        if (e.key === "Enter") {
                            setShowMain(!showMain)
                        }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Add task"
                >
                    <span className="add-task__plus">+</span>
                    <span className="add-task__text">Add Task</span>
                </div>
            )}

            {(showMain || showQuickAddTask) && (
                <div className="add-task__main" data-testid="add-task-main">
                    {showQuickAddTask && (
                        <>
                            <div data-testid="quick-add-task">
                                <h2 className="header">Quick add task</h2>
                                <span
                                    aria-label="Cancel adding task"
                                    className="add-task__cancel-x"
                                    data-testid="add-task-quick-cancel"
                                    onClick={() => {
                                        setShowMain(false);
                                        setShowProjectOverlay(false);
                                        setShowQuickAddTask(false);
                                    }}
                                    onKeyPress={e => {
                                        if (e.key === "Enter") {
                                            setShowMain(false);
                                            setShowProjectOverlay(false);
                                            setShowQuickAddTask(false);
                                        }
                                    }}
                                    tabIndex={0}
                                    role="button"
                                >
                                x
                            </span>
                            </div>
                        </>
                    )}
                    <ProjectOverlay setProject={setProject}
                                    setShowProjectOverlay={setShowProjectOverlay}
                                    showProjectOverlay={showProjectOverlay}
                    />
                    <TaskDate
                        setTaskDate={setTaskDate} showTaskDate={showTaskDate}
                        setShowTaskDate={setShowTaskDate}
                    />
                    <input
                        aria-label="Enter your task"
                        className="add-task__content"
                        data-testid="add-task-content"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        type="text"/>
                    <button
                        type="button"
                        className="add-task__submit"
                        data-testid="add-task"
                        onClick={() => showQuickAddTask ?
                            addTask() && setShowQuickAddTask(false)
                            : addTask()}
                    >
                        Add Task
                    </button>
                    {!showQuickAddTask && (
                        <span className="add-task__cancel"
                              data-testid="add-task-main-cancel"
                              aria-label="Cancel adding a task"
                              onClick={() => {
                                  setShowMain(false);
                                  setShowProjectOverlay(false);
                              }}
                              onKeyPress={e => {
                                  if (e.key === "Enter") {
                                      setShowMain(false);
                                      setShowProjectOverlay(false);
                                  }
                              }}
                              tabIndex={0}
                              role="button"
                        >
                            Cancel
                        </span>
                    )}

                    <span className="add-task__project" data-testid="show-project-overlay"
                          tabIndex={0}
                          role="button"
                          onClick={() => setShowProjectOverlay(!showProjectOverlay)}
                          onKeyPress={e => {
                              if (e.key === "Enter") {
                                  setShowProjectOverlay(!showProjectOverlay);
                              }
                          }}
                    >
                            <FaRegListAlt/>
                    </span>
                    <span className="add-task__date" data-testid="show-task-date-overlay"
                          onClick={() => setShowTaskDate(!showTaskDate)}
                          onKeyPress={e => {
                              if (e.key === "Enter") {
                                  setShowTaskDate(!showTaskDate);
                              }
                          }}
                          tabIndex={0}
                          role="button"
                    >
                            <FaRegCalendarAlt/>
                    </span>
                </div>
            )}
        </div>
    );
};
