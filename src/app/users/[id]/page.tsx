"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { ArrowLeft, Edit2, User as UserIcon, Mail, Calendar, Activity } from "lucide-react";
import { MOCK_ACTIVITY } from "@/lib/mockData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserStatus } from "@/types";
import { cn } from "@/lib/utils";

const editSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  status: z.enum(["Active", "Inactive"]),
});

type EditFormValues = z.infer<typeof editSchema>;

export default function UserDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { users, updateUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = users.find((u) => u.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: user?.name || "",
      status: user?.status || "Active",
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const onSubmit = (data: EditFormValues) => {
    updateUser(user.id, data);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-blue-500 ring-offset-2">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <CardTitle className="mt-4">{user.name}</CardTitle>
            <p className="text-sm text-gray-500">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm">
              <Mail className="mr-3 h-4 w-4 text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-3 h-4 w-4 text-gray-400" />
              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm">
              <div className={cn(
                "mr-3 h-2 w-2 rounded-full",
                user.status === 'Active' ? "bg-green-500" : "bg-red-500"
              )} />
              <span className="font-medium">{user.status}</span>
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                reset({ name: user.name, status: user.status });
                setIsModalOpen(true);
              }}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Activity & Summary */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-500" />
                Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Total Actions</p>
                  <p className="text-2xl font-bold">124</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <p className="text-xs font-medium text-green-600 dark:text-green-400">Last Active</p>
                  <p className="text-lg font-bold">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit User"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input {...register("name")} placeholder="Enter name" />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select {...register("status")}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
