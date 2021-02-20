import { useSelector } from 'react-redux';
import { actions, selectors, useDispatchEffect } from '../store';

export interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
    useDispatchEffect(actions.toDos.fetchAll);

    const toDos = useSelector(selectors.toDos.selectAll);

    return (
        <>
            <h1>Welcome to Asp.Net React ToDo</h1>
            <h3>The packages and project layouts that I like to use for this stack.</h3>

            <pre>{JSON.stringify(toDos, null, 2)}</pre>
        </>
    );
}

export default HomePage;