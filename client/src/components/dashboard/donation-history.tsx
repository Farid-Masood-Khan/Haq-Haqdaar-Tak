import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Donation } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function DonationHistory() {
  const { data: donations, isLoading, error } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Donations</h3>
            <p className="text-red-600">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatAmount = (amount: number | string) => {
    return parseFloat(amount.toString()).toLocaleString('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Donation History</CardTitle>
          <CardDescription>
            View all your contributions to Haq Haqdaar Tak
          </CardDescription>
        </CardHeader>
        <CardContent>
          {donations && donations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{formatDate(donation.date)}</td>
                      <td className="py-3 px-4 font-medium">{formatAmount(donation.amount)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {donation.message ? donation.message : <span className="text-gray-400">No message</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-10">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No donations yet</h3>
              <p className="text-gray-500 mb-6">You haven't made any donations yet. Your generosity can make a difference!</p>
              <a href="/#donate" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                Make Your First Donation
              </a>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary-light/10">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-primary mb-2">Total Donated</h3>
            <p className="text-3xl font-bold">
              {donations && donations.length > 0 
                ? formatAmount(donations.reduce((acc, donation) => acc + parseFloat(donation.amount.toString()), 0)) 
                : 'PKR 0'}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary-light/10">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-primary mb-2">Number of Donations</h3>
            <p className="text-3xl font-bold">{donations?.length || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary-light/10">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-primary mb-2">Impact</h3>
            <p className="text-3xl font-bold">
              {donations && donations.length > 0 
                ? `${Math.floor(donations.reduce((acc, donation) => acc + parseFloat(donation.amount.toString()), 0) / 5000)} families` 
                : '0 families'}
            </p>
            <p className="text-sm text-gray-600 mt-2">Based on PKR 5,000 per family for monthly food package</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
