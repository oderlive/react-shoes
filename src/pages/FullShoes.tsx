import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';

const FullShoes: React.FC = () => {
  const [shoes, setShoes] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: string[];
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchShoes() {
      try {
        const { data } = await axios.get('https://668ab8c22c68eaf3211da11b.mockapi.io/items/' + id);
        setShoes(data);
      } catch (error) {
        alert('Ошибка при получении информации об данном товаре!');
        navigate('/');
      }
    }

    fetchShoes();
  }, []);

  if (!shoes) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', margin: '50px' }}>
        <img src={shoes.imageUrl} style={{ width: '400px', height: '400px', marginRight: '50px' }} />
        <div>
          <h2>{shoes.title}</h2>
          <h2>{shoes.price} ₽</h2>
        </div>
      </div>

      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullShoes;
