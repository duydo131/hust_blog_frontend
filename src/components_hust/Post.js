import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { actChangePost } from './../action/index';
import PropTypes from 'prop-types';

Post.propTypes = {
  idx: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  shortDescription: PropTypes.string,
};

export default function Post(props) {
  const {idx, image, title, date, shortDescription } = props;

	const isManager = useSelector(state => state.manager)
  let history = useHistory();
  const dispatch = useDispatch();

  const change = (id) => dispatch(actChangePost(id));

  const detailHandler = () => {
    change(idx);
    const url = isManager ? 'manager-post': 'post'
    history.push(`${url}?id=${idx}`);
  }

  return (
    <div className="news-block">
      <div className="left-img post-click"> <a title={title}> <img onClick={detailHandler} alt="" src={image ? image : './hust_files/hust.png'} width="165"/></a></div>
      <div className="content">
        <a title={title}>
          <div  onClick={detailHandler} className="news-title post-click"> {title}</div>
        </a>
        <div className="news-date">{date}</div>
        <div 
          style={{ 
            color: 'black', 
            marginBottom: '3%',
          }}
        >
          {shortDescription} 
        </div>
        <a className="icon-detail post-click" title="Xem tất cả">
          <span onClick={detailHandler}>&gt; Xem thêm</span> </a>
      </div>
    </div>
  )
}