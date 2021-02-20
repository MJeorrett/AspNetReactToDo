import { useSelector } from 'react-redux';
import ApiResponseWrapper from '../components/ApiResponseWrapper';
import { actions, selectors, useDispatchEffect } from '../store';

export interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
    useDispatchEffect(actions.toDos.fetchAll);

    const {
        isFetching,
        isError,
    } = useSelector(selectors.toDos.apiState)
    const toDos = useSelector(selectors.toDos.all);

    return (
        <>
            <h1>Welcome to Asp.Net React ToDos</h1>
            <h3>The project layout, packages and boilerplate I like to use for Asp.Net Core + React + EF Core projects.</h3>

            <ApiResponseWrapper
                isFetching={isFetching}
                isError={isError}
            >
                <pre>{JSON.stringify(toDos, null, 2)}</pre>
            </ApiResponseWrapper>
        </>
    );
}

export default HomePage;