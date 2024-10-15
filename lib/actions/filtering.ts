import { questionList } from "@/constants/questionList";
import { mockQuestionCount, typeMockQuestionCount, topics , Topic} from "@/constants/topics";
type settings = {
  mode: string;
  topics: string[];
  number_of_questions:number;
} | undefined

//Fisher Yates Shuffle Array Algorithm
export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateFilteredIndexList = (settings:settings) => {

    if(settings?.mode == "custom"){
        let filteredQuestionIndexes;
        if(settings.topics.length > 0){
            const initialFilteredIndexes = questionList.reduce((acc:number[], question, index:number) => {
                if (settings.topics.includes(question.Topic)) {
            acc.push(index);
          }
          return acc;
            },[]
        )
    
        filteredQuestionIndexes = shuffleArray(initialFilteredIndexes).slice(0, settings.number_of_questions)
        
    }else{
            const allIndexes = Array.from({ length: questionList.length },
        (_, index) => index)

        filteredQuestionIndexes = shuffleArray(allIndexes).slice(0,settings.number_of_questions)
        };

        return filteredQuestionIndexes;
    }

    if(settings?.mode == "mock"){
        const questionCounts:typeMockQuestionCount = {...mockQuestionCount}
        let selectedIndexes:number[] = [];
        const filteredQuestions = shuffleArray([...questionList]);
        
        for (const question of filteredQuestions){
          const topic:Topic = question.Topic
          if(questionCounts[topic] > 0){
            selectedIndexes.push(questionList.indexOf(question));
            questionCounts[topic]--;
          }
          if (Object.values(questionCounts).every(count => count === 0)) break;
        }

        const randomIndexes = shuffleArray(Array.from({ length: questionList.length }, (_, index:number) => index))
      .filter((index:number) => !selectedIndexes.includes(index))
      .slice(0, 2);
    
      selectedIndexes = [...selectedIndexes, ...randomIndexes];

      return selectedIndexes.sort((a, b) => {
        const topicA = questionList[a].Topic;
        const topicB = questionList[b].Topic;
        return topics.indexOf(topicA) - topics.indexOf(topicB);
      });
    }
}

