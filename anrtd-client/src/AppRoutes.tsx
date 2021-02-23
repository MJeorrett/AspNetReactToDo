import { Route, Switch, useParams } from 'react-router-dom';
import CreateToDoPage from './pages/CreateToDo';
import EditToDoPage from './pages/EditToDo';
import HomePage from './pages/Home';
import ToDosPage from './pages/ToDos';

export const appPaths = {
    home: '/',
    toDos: '/todos',
    createToDo: '/todos/create',
    editToDo: (toDoId: number|string): string => `/todos/${toDoId}/edit`,
};

const AppRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path={appPaths.toDos} exact><ToDosPage /></Route>
            <Route path={appPaths.createToDo} exact><CreateToDoPage /></Route>
            <Route path={appPaths.editToDo(':toDoId')} exact><EditToDoPage /></Route>
            <Route path={appPaths.home}><HomePage /></Route>
        </Switch>
    );
};

export const useToDoId = (): string => {
    const { toDoId } = useParams<{ toDoId: string}>();
    return toDoId;
};
 
export default AppRoutes;