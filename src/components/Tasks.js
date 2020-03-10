import React, { useEffect } from "react";
import { Checkbox } from "./Checkbox";
import { useTasks } from "../hooks";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { collatedTasksExist, getCollatedTitle, getTitle } from "../helpers";
import { collatedTasks } from "../constants";
import { AddTask } from "./AddTask";

export const Tasks = () => {
    const {selectedProject} = useSelectedProjectValue();
    const {projects} = useProjectsValue();
    const {tasks} = useTasks(selectedProject);

    let projectName = '';

    if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name;
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`;
    });

    return (
        <div className='tasks' data-testid='tasks'>
            <h2 data-testid='project-name'>{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map(task => (
                    <li key={`${task.id}`}>
                        <Checkbox id={task.id} taskDesc={task.task}/>
                        <span>{task.task}</span>
                    </li>
                ))}
            </ul>
            <AddTask/>
        </div>
    );

};