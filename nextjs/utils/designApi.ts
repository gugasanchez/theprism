interface ImageData {
  type: string;
  data: number[];
}

export interface Design {
  _id: string;
  image: ImageData;
  image_hash: string;
  designId: number;
  prompt: string;
}

const baseUrl = "https://the-prism-backend.vercel.app/designs/";
const imageIdUrl = "https://the-prism-backend.vercel.app/counter/seq/design";

const designApi = {
  getDesigns: async (): Promise<Design[]> => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch designs");
    }
    return response.json();
  },

  getDesign: async (id: string): Promise<Design> => {
    const response = await fetch(`${baseUrl}${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch design with id ${id}`);
    }
    return response.json();
  },

  createDesign: async (prompt: string): Promise<Design> => {
    try {
      const responseId = await fetch(imageIdUrl);
      if (!responseId.ok) {
        throw new Error("Failed to fetch current designId");
      }
      const currentDesignId = await responseId.text();
      const newDesignId = parseInt(currentDesignId) + 1;

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, designId: newDesignId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create design");
      }
      return response.json();
    } catch (error: any) {
      throw new Error(`Error in createDesign: ${error.message}`);
    }
  },

  deleteDesign: async (id: string): Promise<void> => {
    const response = await fetch(`${baseUrl}${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Failed to delete design with id ${id}`);
    }
  },
};

export default designApi;
