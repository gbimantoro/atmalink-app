import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider extends ChangeNotifier {
  String? _token;
  Map<String, dynamic>? _user;

  String? get token => _token;
  Map<String, dynamic>? get user => _user;
  bool get isAuthenticated => _token != null;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('auth_token');
    if (_token != null) {
      // TODO: fetch /auth/me
    }
    notifyListeners();
  }

  Future<void> login(String email, String password) async {
    // TODO: call API
    _token = 'dev-token';
    _user = {'email': email, 'full_name': 'Demo Alumni'};
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', _token!);
    notifyListeners();
  }

  Future<void> logout() async {
    _token = null;
    _user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    notifyListeners();
  }
}