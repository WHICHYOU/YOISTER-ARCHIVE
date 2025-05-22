{/*  lib/tribe.ts */}
export interface TribeData {
  tribe: string;
  members: string[];
}

export async function getTribe(userId: string): Promise<TribeData> {
  return { tribe: "Nostalgic Tribe", members: ["User1", "User2", "User3"] };
}

export async function createOrUpdateTribe(data: {
  name: string;
  description: string;
}) {
  return { name: data.name, description: data.description };
}
