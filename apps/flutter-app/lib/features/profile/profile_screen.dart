import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/auth_provider.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});
  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    return Scaffold(
      appBar: AppBar(title: const Text('Profil')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          CircleAvatar(radius: 48, backgroundColor: Theme.of(context).colorScheme.primaryContainer, child: Text(auth.user?['full_name']?[0]?.toUpperCase() ?? 'A', style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold))),
          const SizedBox(height: 16),
          Text(auth.user?['full_name'] ?? 'Alumni', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
          Text(auth.user?['email'] ?? '', textAlign: TextAlign.center, style: const TextStyle(color: Colors.grey)),
          const SizedBox(height: 24),
          Card(child: ListTile(title: const Text('Logout'), trailing: const Icon(Icons.logout), onTap: () => context.read<AuthProvider>().logout())),
        ],
      ),
    );
  }
}