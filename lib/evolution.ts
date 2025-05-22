type Vote = {
  tag: string;
};

type UserProfile = Record<string, number>;

type User = {
  profile: UserProfile;
};

export const trackEvolution = (user: User, newVotes: Vote[]): void => {
  const updatedProfile: UserProfile = newVotes.reduce(
    (profile: UserProfile, vote: Vote) => {
      profile[vote.tag] = (profile[vote.tag] || 0) + 1;
      return profile;
    },
    {}
  );

  user.profile = updatedProfile;
};

{/*  New helper for server-side usage */}
export const updateProfileEvolution = async (
  userId: string,
  newVotes: Vote[]
) => {
  const profile: UserProfile = {};

  newVotes.forEach((vote) => {
    profile[vote.tag] = (profile[vote.tag] || 0) + 1;
  });

  {/*  Optional: write to Supabase or return the profile */}
  {/*  Example: await supabase.from('users').update({ profile }).eq('id', userId) */}

  return {
    userId,
    profile,
  };
};
