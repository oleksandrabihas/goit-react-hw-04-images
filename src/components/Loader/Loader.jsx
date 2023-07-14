import { StyledLoader } from "./Loader.styled";
import { ThreeCircles } from 'react-loader-spinner';


export const Loader = () => {
    return (
      <StyledLoader>
        <ThreeCircles
          height="200"
          width="200"
        />
      </StyledLoader>
    );
};
