import {
    Card, CardBody,CardText, CardSubtitle, Button, CardImg, CardTitle
} from 'reactstrap'

function CardStrap(props) {

    console.log(`---------`)
    console.log(`props`)
    

    return (
            <Card>
                <CardImg
                alt="Card Image Caption"
                src="https:picsum.photos/318/180"
                width="100%"
                />
                <CardBody>
                    <CardTitle tag="h5">{props.cardobject.title}</CardTitle>
                    <CardSubtitle>Gipht Alt Text</CardSubtitle>
                    <CardText>
                        {props.cardobject.description}
                    </CardText>
                    <Button>{props.cardobject.buttonText ? props.cardobject.buttonText : 'View Page'}</Button>
                </CardBody>
            </Card>
    )
}

export default CardStrap;