import { create } from 'zustand';
import { Community, CommunityMember } from '@/types/community';

interface CommunityState {
  communities: Community[];
  currentCommunity: Community | null;
  members: CommunityMember[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setCommunities: (communities: Community[]) => void;
  addCommunity: (community: Community) => void;
  updateCommunity: (id: string, updates: Partial<Community>) => void;
  setCurrentCommunity: (community: Community | null) => void;
  setMembers: (members: CommunityMember[]) => void;
  addMember: (member: CommunityMember) => void;
  updateMember: (id: string, updates: Partial<CommunityMember>) => void;
  removeMember: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  communities: [],
  currentCommunity: null,
  members: [],
  loading: false,
  error: null,

  setCommunities: (communities) =>
    set({ communities }),

  addCommunity: (community) =>
    set((state) => ({ 
      communities: [...state.communities, community] 
    })),

  updateCommunity: (id, updates) =>
    set((state) => ({
      communities: state.communities.map((community) =>
        community.id === id ? { ...community, ...updates } : community
      ),
      currentCommunity: state.currentCommunity?.id === id 
        ? { ...state.currentCommunity, ...updates }
        : state.currentCommunity,
    })),

  setCurrentCommunity: (community) =>
    set({ currentCommunity: community }),

  setMembers: (members) =>
    set({ members }),

  addMember: (member) =>
    set((state) => ({ 
      members: [...state.members, member] 
    })),

  updateMember: (id, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      ),
    })),

  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== id),
    })),

  setLoading: (loading) =>
    set({ loading }),

  setError: (error) =>
    set({ error }),
})); 