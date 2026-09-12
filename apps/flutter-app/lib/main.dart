import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'core/theme.dart';
import 'features/auth/auth_provider.dart';
import 'features/auth/login_screen.dart';
import 'features/home/home_screen.dart';
import 'features/news/news_screen.dart';
import 'features/alumni/alumni_screen.dart';
import 'features/events/events_screen.dart';
import 'features/jobs/jobs_screen.dart';
import 'features/donate/donate_screen.dart';
import 'features/profile/profile_screen.dart';
import 'features/chat/chat_screen.dart';

void main() {
  runApp(const MyApp());
}

final _router = GoRouter(
  initialLocation: '/login',
  routes: [
    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
    ShellRoute(
      builder: (context, state, child) => MainScaffold(child: child),
      routes: [
        GoRoute(path: '/', builder: (_, __) => const HomeScreen()),
        GoRoute(path: '/news', builder: (_, __) => const NewsScreen()),
        GoRoute(path: '/alumni', builder: (_, __) => const AlumniScreen()),
        GoRoute(path: '/events', builder: (_, __) => const EventsScreen()),
        GoRoute(path: '/jobs', builder: (_, __) => const JobsScreen()),
        GoRoute(path: '/donate', builder: (_, __) => const DonateScreen()),
        GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
        GoRoute(path: '/chat', builder: (_, __) => const ChatScreen()),
      ],
    ),
  ],
  redirect: (context, state) {
    final auth = context.read<AuthProvider>();
    final loggingIn = state.matchedLocation == '/login';
    if (!auth.isAuthenticated && !loggingIn) return '/login';
    if (auth.isAuthenticated && loggingIn) return '/';
    return null;
  },
);

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AuthProvider()..init(),
      child: MaterialApp.router(
        title: 'PERLUNI UAJ',
        theme: appTheme,
        routerConfig: _router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

class MainScaffold extends StatefulWidget {
  final Widget child;
  const MainScaffold({super.key, required this.child});
  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  int _index = 0;
  static const _destinations = [
    NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
    NavigationDestination(icon: Icon(Icons.people_outline), selectedIcon: Icon(Icons.people), label: 'Alumni'),
    NavigationDestination(icon: Icon(Icons.work_outline), selectedIcon: Icon(Icons.work), label: 'Karir'),
    NavigationDestination(icon: Icon(Icons.favorite_outline), selectedIcon: Icon(Icons.favorite), label: 'Donasi'),
    NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Profil'),
  ];

  void _onTap(int i) {
    setState(() => _index = i);
    switch (i) {
      case 0: context.go('/'); break;
      case 1: context.go('/alumni'); break;
      case 2: context.go('/jobs'); break;
      case 3: context.go('/donate'); break;
      case 4: context.go('/profile'); break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: _onTap,
        destinations: _destinations,
        indicatorColor: Theme.of(context).colorScheme.primaryContainer,
      ),
    );
  }
}