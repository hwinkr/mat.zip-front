import { useEffect } from "react";
import { CampusId } from "types/common";

import useRandomPick from "hooks/useRandomPick";

import Button from "components/common/Button/Button";
import ErrorImage from "components/common/ErrorImage/ErrorImage";
import Spinner from "components/common/Spinner/Spinner";
import StoreListItem from "components/common/StoreListItem/StoreListItem";
import Text from "components/common/Text/Text";

import * as S from "components/pages/CategoryPage/RandomRoulette/RandomRoulette.style";

type Props = {
  campusId: CampusId;
};

function RandomRoulette({ campusId }: Props) {
  const {
    isLoading,
    isError,
    error,
    state: { rouletteBoard, isResultOpen, result, triggerAnimation },
    handleRunClick,
    showResult,
    resetHard,
    refetchAndStartSpin,
  } = useRandomPick(campusId);

  useEffect(() => {
    resetHard();
  }, [campusId]);

  return (
    <S.Container>
      {isLoading && <Spinner />}
      {isError && error instanceof Error && (
        <ErrorImage errorMessage={error.message} />
      )}
      <S.RecommendBlock>
        <Text size="lg">오늘은 </Text>
        <S.Outer>
          <S.Inner runAnimation={triggerAnimation} onAnimationEnd={showResult}>
            {rouletteBoard.map((store, index) => (
              <S.RouletteSlot key={store + index}>{store}</S.RouletteSlot>
            ))}
          </S.Inner>
        </S.Outer>
        <Text size="lg">어때요?</Text>
      </S.RecommendBlock>
      {!isResultOpen ? (
        <Button
          variant="primary"
          size="small"
          onClick={handleRunClick}
          disabled={triggerAnimation}
        >
          룰렛 Go!
        </Button>
      ) : (
        <S.ButtonContainer>
          <Button variant="primary" size="small" onClick={refetchAndStartSpin}>
            다시 돌리기
          </Button>
        </S.ButtonContainer>
      )}
      {isResultOpen && result !== undefined && (
        <S.ResultWrapper>
          <StoreListItem
            id={result.id}
            thumbnailUrl={result.imageUrl}
            name={result.name}
            distance={result.distance}
            rating={result.rating}
            reviewCount={result.reviewCount}
            liked={result.liked}
          />
        </S.ResultWrapper>
      )}
    </S.Container>
  );
}

export default RandomRoulette;
