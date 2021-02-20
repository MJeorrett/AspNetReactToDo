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
            <h1>Welcome to Asp.Net React ToDo</h1>
            <h3>The packages and project layouts that I like to use for this stack.</h3>

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