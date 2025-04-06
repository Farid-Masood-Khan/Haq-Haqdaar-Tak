import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Mail, Phone, User } from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSave = () => {
    // In a real application, this would update the user's profile
    // via an API call and then update the user state
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          View and manage your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!isEditing ? (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user?.fullName}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center text-gray-500 mt-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Account Information</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <span className="text-gray-500">Username:</span>
                    <span className="col-span-2">{user?.username}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <span className="text-gray-500">Member Since:</span>
                    <span className="col-span-2">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(user?.fullName || "");
                    setEmail(user?.email || "");
                    setPhone(user?.phone || "");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
