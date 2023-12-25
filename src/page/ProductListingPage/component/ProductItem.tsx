import '../../../common/commonStyle.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ProductDto } from '../../../data/dto/ProductDto';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

type Props = {
    productDetail: ProductDto
}

export default function ProductItem({ productDetail }: Props) {
    const navigate = useNavigate();

    return (
        <>
            <Card
                className='backGlassBox productCard'
                style={{
                    width: '18vw',
                    minWidth: '350px',
                    minHeight: '600px',
                    marginBottom: '20px'
                }}
            >

                <div style={{
                    backgroundImage: `url(${productDetail.image_url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    width: '100%',
                    height: '240px'
                }} />

                <hr />

                <Card.Body>

                    <Card.Title className='cardText'>
                        {productDetail.name}
                    </Card.Title>

                    <Card.Text 
                    className='cardText'
                    style={{
                        position: 'absolute',
                        bottom: '8vh',
                        width: '80%',
                        fontSize: '1.75rem'
                    }}
                    >
                        <hr />
                        <span>售價: </span>
                        <NumericFormat
                            value={productDetail.price.toFixed(2)}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                        />
                        {/* $ {productDetail.price} */}
                    </Card.Text>

                    <div
                        style={{
                            position: 'absolute',
                            bottom: '2vh',
                            right: '37%'
                        }}
                    >
                        <Button
                            className='itemButton'
                            onClick={
                                () => {
                                    navigate(`detail/${productDetail.pid}`)
                                }
                            }
                        >
                            進一步了解
                        </Button>
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}