import { supabaseBrowser } from "../supabase/browser";
import { redirect } from "next/navigation";

const supabase = supabaseBrowser()

export const handleLoginWithOAuth = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback?next=/home",
      },
    });
  };

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

export const fetchGameplayData = async () => {
  const userID = await fetchUserID();

  const { data: gameplayData, error: errorGameplayData } = await supabase
    .from("gameplay")
    .select("question_index_list, option_index_list, number_of_questions")
    .eq("user_id", userID)
    .order("created_at", { ascending: true });

  if(errorGameplayData || !gameplayData){
    console.error("Error fetching gameplay data: ", errorGameplayData);
    return;
  }
  
  return gameplayData[gameplayData.length - 1];
}

export const fetchSettings = async () => { 
  const userID = await fetchUserID()

  if(!userID){
    redirect("/")
  }

  const { data: settingsData, error: settingsDataError } = await supabase
      .from("settings")
      .select("mode, topics, number_of_questions")
      .eq("user_id", userID)
      .order("created_at", { ascending: true });

    if (settingsDataError) {
      console.error("Error fetching topic data ", settingsDataError);
      return;
    }

    return settingsData[settingsData.length - 1]
}

export const insertGameplayData = async (correctAnswers:number, questionIndexes:number[], indexSelected:number[], questionAmount:number) => {
  const userName = await fetchUserName()

  const { error: gameplayInsertError } = await supabase
      .from("gameplay")
      .insert({
        accurate: correctAnswers,
        name: userName,
        question_index_list: questionIndexes,
        option_index_list: indexSelected,
        number_of_questions: questionAmount,
      });

    if (gameplayInsertError) {
      console.error("Error inserting gameplay data");
      return
    }
    console.log("gameplay submitted succesfully")
}

export const insertCustomSettings = async (topicsChosen:string[], amount:number) => {
    const { error: insertError } = await supabase
      .from("settings")
      .insert([{mode: "custom", 
        number_of_questions: amount, 
        topics: topicsChosen}]);
    
    if (insertError) {
      console.error("Error inserting custom settings ", insertError);
      return;
    }
  };

export const insertMockSettings = async() =>{
    const { error: insertTopicsError } = await supabase
      .from("settings")
      .insert([{mode: "mock", number_of_questions:30}]);

    if (insertTopicsError) {
      console.error("Error inserting mock settings");
      return;
    }
    
  };

  export const fetchAccuracy = async () => {
    const userID = await fetchUserID();

    if(!userID){
      redirect("/");
    }

    const {data:gameplayData, error: errorGameplayData} = await supabase
    .from("gameplay")
    .select("accurate, number_of_questions")
    .eq("user_id", userID)
    .order("created_at", {ascending: true})

    if (!gameplayData || errorGameplayData){
      console.error("Error fetching gameplay/accuracy data: ", errorGameplayData);
      return;
    }

    return gameplayData[gameplayData.length-1];
  }