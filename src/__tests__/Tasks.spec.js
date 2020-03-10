import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from "../context";


jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(),
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: "WOW",
                projectId: "-M1fV-4X------------",
                userId: "1"
            },
            {
                name: "FUTURE",
                projectId: "2",
                userId: "1"
            },
            {
                name: "DAILY",
                projectId: "3",
                userId: "1"
            },
            {
                name: "MUSIC",
                projectId: "1",
                userId: "1"
            },

        ]
    }))
}));

jest.mock('../hooks', () => ({
    useTasks: () => ({
        tasks: [
            {
                archived: true,
                date: "",
                projectId: "3",
                task: "Greatest task",
                userId: "1"
            }
        ]
    })
}));

beforeEach(cleanup);

describe("<Tasks />", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders tasks', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));
        const {queryByTestId} = render(<Tasks/>);
        expect(queryByTestId('tasks')).toBeTruthy();

        expect(queryByTestId('project-name').textContent).toBe('Inbox');
    });

    it('renders a task with a project title', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => '1'),
            selectedProject: '1',
        }));
        const {queryByTestId} = render(<Tasks/>);
        expect(queryByTestId('tasks')).toBeTruthy();

        expect(queryByTestId('project-name').textContent).toBe('MUSIC');
    });

    it('renders a task with a collated title', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));
        const {queryByTestId} = render(<Tasks/>);
        expect(queryByTestId('tasks')).toBeTruthy();

        expect(queryByTestId('project-name').textContent).toBe('Inbox');
    });

});
