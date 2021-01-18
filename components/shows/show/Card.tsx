import tw, { styled } from "twin.macro";
import type { Show } from "../../../db/entity";

const Colors = {
  lightText: "#818c99",
  text: "#9fadbd",
};
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: #1f232d;
  height: 265px;
  font-family: Overpass, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  ${tw`rounded-sm`};
`;
const Poster = styled.img`
  height: 265px;
  min-width: 185px;
  width: 185px;
  ${tw`rounded-l-sm`}
`;
const InfoWrapper = styled.div`
  ${tw`flex flex-col justify-between min-h-0`}
`;
const AirDetails = styled.div`
  padding: 17px 17px 10px;
  padding-right: 0px;
  color: ${Colors.text};
  overflow-y: auto;

  ::-webkit-scrollbar {
    visibility: hidden;
  }
  :hover::-webkit-scrollbar {
    position: absolute;
    visibility: visible;
    width: 0.3rem;
  }
  :hover::-webkit-scrollbar-thumb {
    background: ${Colors.text};
    border-radius: 0.5rem;
  }
`;
const EpisodeAiring = styled.div`
  ${tw`text-xs`}
  color: ${Colors.lightText};
`;
const AirDate = styled.div`
  ${tw`mt-1 text-lg font-semibold`}
`;
const SequelText = styled.div`
  ${tw`mt-1 text-xs`}
`;
const Summary = styled.p`
  ${tw`mt-1 text-xs`};
  line-height: 17.6px;
  color: ${Colors.lightText};
`;
const Footer = styled.div`
  ${tw`flex px-3 place-items-center justify-evenly`};
  background-color: #191d26;
  min-height: 44px;
`;

const Tag = styled.button`
  ${tw`text-xs font-bold`};
  background-color: #ebb62d;
  border-radius: 0.3rem;
  color: #8a2c0f;
  height: 20px;
`;
const TagText = styled.span`
  ${tw`m-2`}
`;

interface CardProps {
  show: Show;
}
const Card = ({ show }: CardProps) => {
  return (
    <CardWrapper>
      <Poster
        src={`http://image.tmdb.org/t/p/w185${show.posterPath}`}
        alt={show.name}
      />
      <InfoWrapper>
        <AirDetails>
          <EpisodeAiring>
            Ep {show.numSeasons} of {show.numEpisodes} airing in
          </EpisodeAiring>
          <AirDate>1 day, 11 hours</AirDate>
          <SequelText>Sequel to Dr.STONE</SequelText>
          <Summary>{show.overview}</Summary>
        </AirDetails>
        <Footer>
          {Object.keys(show.externalIds)
            .slice(0, 3)
            .map((id, index) => (
              <Tag key={index}>
                <TagText>{id}</TagText>
              </Tag>
            ))}
        </Footer>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default Card;
