import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const TITLE = "Sign in — Flight Price Notifier";
const DESCRIPTION = "登入你的 Flight Price Notifier 帳號，管理機票降價通知。";

export function SignIn() {
  useDocumentMeta(TITLE, DESCRIPTION);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/app");
  }

  return (
    <AuthShell
      title="Sign in / 登入"
      subtitle="用 email 和密碼登入你的帳號。"
      footer={
        <>
          還沒有帳號？{" "}
          <Link to="/signup" className="text-primary hover:underline">
            建立帳號 / Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密碼 / Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "登入中…" : "Sign in / 登入"}
        </Button>
      </form>
    </AuthShell>
  );
}
