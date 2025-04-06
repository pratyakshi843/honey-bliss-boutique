
import { toast } from "@/hooks/use-toast";

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

// This is a mock implementation since we can't actually implement Google OAuth without proper credentials
// In a real application, you would use the Google Identity Services library
export const signInWithGoogle = async (): Promise<GoogleUser | null> => {
  try {
    // Simulate a Google sign-in
    // In a real application, this would be replaced with actual Google OAuth implementation
    
    // Simulate a successful login
    const mockUser: GoogleUser = {
      email: "user@example.com",
      name: "Demo User",
      picture: "https://randomuser.me/api/portraits/women/17.jpg",
    };
    
    // Store user info in localStorage to persist the login state
    localStorage.setItem("user", JSON.stringify(mockUser));
    
    toast({
      title: "Sign in successful!",
      description: `Welcome, ${mockUser.name}!`,
      duration: 3000,
    });
    
    return mockUser;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    
    toast({
      title: "Sign in failed",
      description: "Could not sign in with Google. Please try again.",
      variant: "destructive",
      duration: 3000,
    });
    
    return null;
  }
};
