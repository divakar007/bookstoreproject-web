import errorImage from '../assets/images/error.png';
import '../assets/css/ErrorPage.css';

function ErrorPage(){
    return (
        <div>
            <img className="errorImage" src={errorImage} alt={"error.page"}/>
        </div>
    )
}

export default ErrorPage;