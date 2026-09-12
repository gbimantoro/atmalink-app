import 'package:flutter/material.dart';

class AlumniScreen extends StatelessWidget {
  const AlumniScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title: const Text('Alumni')), body: const Center(child: Text('Alumni directory')));
  }
}