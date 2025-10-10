import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const CARDS_API_BASE_URL = 'http://localhost:8081/api/v1';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullname: string;
  };
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    fullname: string;
    email: string;
  };
}

export interface ValidateTokenResponse {
  valid: boolean;
  userId: string;
  role: string;
}

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  },

  validateToken: async (token: string): Promise<ValidateTokenResponse> => {
    const response = await axios.post(`${API_BASE_URL}/validate`, { token });
    return response.data;
  },
};

// Cards API
export interface GenerateCardRequest {
  photo_url: string;
  short_description: string;
}

export interface GenerateCardResponse {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface CardInfo {
  id: string;
  photo_url: string;
  short_description: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  created_at: string;
}

export interface CardHistoryResponse {
  cards: CardInfo[];
}

export interface CardDetailResponse {
  id: string;
  photo_url: string;
  short_description: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  created_at: string;
}

export const cardsApi = {
  generateCard: async (data: GenerateCardRequest, token: string): Promise<GenerateCardResponse> => {
    const response = await axios.post(`${CARDS_API_BASE_URL}/cards/generate`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getCardHistory: async (token: string): Promise<CardHistoryResponse> => {
    const response = await axios.get(`${CARDS_API_BASE_URL}/cards/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getCardById: async (id: string, token: string): Promise<CardDetailResponse> => {
    const response = await axios.get(`${CARDS_API_BASE_URL}/cards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
