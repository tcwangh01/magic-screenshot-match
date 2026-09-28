import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const TITLE = "Sign up — Flight Price Notifier";
const DESCRIPTION = "建立 Flight Price Notifier 帳號，開始接收機票降價通知。";

export function SignUp() {
  useDocumentMeta(TITLE, DESCRIPTION);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      toast.success("請到信箱點擊確認連結後再登入。");
      navigate("/signin");
      return;
    }
    navigate("/app");
  }

  return (
    <AuthShell
      title="Create account / 註冊"
      subtitle="用 email 和密碼建立帳號，馬上開始追蹤票價。"
      footer={
        <>
          已經有帳號？{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign in / 登入
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
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "建立中…" : "Sign up / 註冊"}
        </Button>
      </form>
    </AuthShell>
  );
}
