import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text('Welcome Home,', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          Card(child: ListTile(title: const Text('What\'s Happening'), subtitle: const Text('Horizontal cards'), trailing: const Icon(Icons.chevron_right))),
          Card(child: ListTile(title: const Text('Upcoming Events'), subtitle: const Text('Vertical list'), trailing: const Icon(Icons.chevron_right))),
        ],
      ),
    );
  }
}