/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";

type typesPokemon = [
  type: string
]

interface Pokemon{
  id: number;
  name: string;
  url: string;
  types: typesPokemon[];
  sprites?: string | any;
  front_default?: string;
  abilities?: string[];
  ability?: string[],
}

type Request = {
   id:number;
   types: typesPokemon[];
   abilities?: string[];
   stats?: string;
   sprites?: string | any;
}

const urlBase = "https://pokeapi.co/api/v2/pokemon?limit=20";

const Home = () => {
  const [data, setData] = useState<Pokemon[]>([]);

  const handleChange = async() => {
    await axios.get(urlBase).then(async (res:Pokemon| any)=>{
      const { results } = res.data;
      const payLoadPoke = await Promise.all(
        results.map(async(pokemon:Pokemon)=>{
          const { id , types, stats, sprites, abilities } = await getMoreInfo(pokemon.url);
            return {
              name: pokemon.name,
              id,
              types,
              stats,
              sprites,
              abilities
            }
        })
      )
      setData(payLoadPoke)
    })
    .catch((error)=> console.log(error))
  };

  const getMoreInfo = async(url:string) : Promise<Request> => {
    const res = await axios.get(url);
    const { id, types, stats, sprites, abilities } = res.data;
    return { id, types, stats, sprites, abilities };
  }

  const pokemonTypes = (types:any[]) => {
    if(types){
      return types.map((i:any)=> i.type.name.concat(" | "));
    }
    return " - ";    
  }

  const pokemonAbilities = (abilities:any[]) => {
    if(abilities){
      return abilities.map((i:any)=>i.ability.name.concat(" / "));
    }
    return " - ";    
  }

  const pokemonSprits = (sprites:any) => {

    if(sprites.other.showdown.front_default){
      return sprites.other.showdown.front_default;
    }
    
    return sprites.front_default; 
  }
   
  useEffect(() => {
    handleChange();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {data
            ? data.map((pokemon: Pokemon| any, index: number) => (
                <Col key={index} style={{ marginBottom: "20px" }}>
                  <Card style={{ width: "12rem", height: "auto" }}>
                    <Card.Body>
                    <Card.Subtitle className="mb-0 text-muted">{pokemon.id}</Card.Subtitle>
                      <Card.Title className="title">{pokemon.name}</Card.Title>
                      <Card.Img variant="top" src={pokemonSprits(pokemon.sprites)} />
                      <Card.Text className="mb-1 my-text">
                        Some quick example text to build on the card .
                      </Card.Text>
                      <Card.Subtitle  className="mb-0 text-muted">
                         <p className="my-p">Tipos: <span>{pokemonTypes(pokemon.types)}</span></p> 
                         <p className="my-p">Habilidades:  <span>{pokemonAbilities(pokemon.abilities)}</span></p> 
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : "Nenhum Pokemon"}
        </Row>
      </Container>
    </>
  );
};

export default Home;
