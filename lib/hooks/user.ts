import { supabaseBrowser } from "../supabase/browser";
import { redirect } from "next/navigation";

const supabase = supabaseBrowser()

export const fetchUserID = async () => {
    const { data: userDataRes, error: userDataError } =
      await supabase.auth.getUser();

    if (!userDataRes || userDataError) {
      console.error("Error fetching user data");
      return;
    }

    return userDataRes.user.id
}

export const fetchUserName = async () => {
  const { data: userData, error: userDataError } =
      await supabase.auth.getUser();

    if (!userData || userDataError) {
      console.error("Error fetching user data");
      return;
    }
    return userData.user.user_metadata.name
}

export const fetchUserPicture = async () => {
  const { data: userData, error: userDataError } =
      await supabase.auth.getUser();

    if (!userData || userDataError) {
      console.error("Error fetching user data");
      return;
    }
    return userData.user.user_metadata.picture
}

export const fetchQuestionIndexes = async () => {
  const userID = await fetchUserID();

  const { data: questionIndexesData, error: errorQuestionIndexesData } = await supabase
    .from("gameplay")
    .select("question_index_list")
    .eq("user_id", userID)
    .order("created_at", { ascending: true });
   
  if(!questionIndexesData || errorQuestionIndexesData){
    console.error("Error fetching question indexes")
    return
  }

  return questionIndexesData[questionIndexesData.length-1].question_index_list
}


export const fetchClickedOptionIndexes = async () => {
  const userID = await fetchUserID()

  const { data: optionIndexesData, error: optionIndexesErrorData } = await supabase
      .from("gameplay")
      .select("option_index_list")
      .eq("user_id", userID)
      .order("created_at", { ascending: true }); 
  
  if(!optionIndexesData || optionIndexesErrorData){
    console.error("Error fetching clicked option indexes")
    return
  }

  return optionIndexesData[optionIndexesData.length -1].option_index_list
}


export const fetchSavedIndexes = async () =>{
  const userID = await fetchUserID();

  const { data: savedIndexesData, error: savedIndexesError } =
      await supabase
        .from("profiles")
        .select("savedIndexes")
        .eq("id", userID);

  if(savedIndexesError || !savedIndexesData){
    console.error("Error fetching saved indexes ",savedIndexesError)
    return
  }

  return savedIndexesData[0].savedIndexes
}

export const fetchTopics = async () => {
  const userID = await fetchUserID()

  if(!userID){
    redirect("/")
  }

  const { data: topicData, error: topicDataError } = await supabase
      .from("topics_chosen")
      .select("topics")
      .eq("user_id", userID)
      .order("created_at", { ascending: true });

    if (topicDataError) {
      console.error("Error fetching topic data");
      return;
    }

    return topicData[topicData.length - 1]["topics"]
}

export const insertGamepData = async (correctAnswers:number, questionIndexes:number[], indexSelected:number[]) => {
  const userName = await fetchUserName()

  const { error: gameplayInsertError } = await supabase
      .from("gameplay")
      .insert({
        accurate: correctAnswers,
        name: userName,
        question_index_list: questionIndexes,
        option_index_list: indexSelected,
      });

    if (gameplayInsertError) {
      console.error("Error inserting gameplay data");
      return
    }
    console.log("gameplay submitted succesfully")
}