import { useLoading } from '../../hooks/useLoading';
import Cookie from '../../assets/pass-icon-ocult.png';

import "./styled.scss";


const Loading = () => {
  const { loading } = useLoading();

  return (
    loading && (
      <div className='background-loading'>
       <img className="loading-cookie" src={Cookie} />
      </div>
    )
  );
};

export default Loading;
