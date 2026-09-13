import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/logo.dart';
import 'auth_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _loading = false;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.network('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', fit: BoxFit.cover),
          Container(color: Colors.black.withOpacity(0.5)),
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 360),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.12),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: const AtmaLinkLogoWidget(
                          variant: AtmaLogoVariant.vertical,
                          size: 60,
                          showTagline: false,
                        ),
                      ),
                      const SizedBox(height: 24),
                      const Text('Welcome Home', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      const Text('Masuk ke komunitas alumni Atma Jaya', style: TextStyle(color: Colors.white70)),
                      const SizedBox(height: 32),
                      Container(
                        padding: const EdgeInsets.all(24),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: Column(
                          children: [
                            TextField(
                              controller: _email,
                              decoration: const InputDecoration(labelText: 'Student ID / Email', prefixIcon: Icon(Icons.email_outlined)),
                            ),
                            const SizedBox(height: 16),
                            TextField(
                              controller: _password,
                              obscureText: true,
                              decoration: const InputDecoration(labelText: 'Password', prefixIcon: Icon(Icons.lock_outline)),
                            ),
                            const SizedBox(height: 24),
                            SizedBox(
                              width: double.infinity,
                              child: ElevatedButton(
                                onPressed: _loading ? null : () async {
                                  setState(() => _loading = true);
                                  await auth.login(_email.text, _password.text);
                                  setState(() => _loading = false);
                                },
                                child: _loading ? const CircularProgressIndicator(color: Colors.white) : const Text('Login'),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),
                      TextButton(
                        onPressed: () {},
                        child: const Text('First time logging in?', style: TextStyle(color: Colors.white, decoration: TextDecoration.underline)),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}