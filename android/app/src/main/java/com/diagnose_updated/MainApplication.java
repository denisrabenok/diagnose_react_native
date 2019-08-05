package com.diagnose_updated;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.benwixen.rnfilesystem.RNFileSystemPackage;
import com.filepicker.FilePickerPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new OrientationPackage(),
            new SplashScreenReactPackage(),
            new RNLocationPackage(),
            new ImagePickerPackage(),
            new ReactNativeGetLocationPackage(),
            new RNGestureHandlerPackage(),
            new RNFileSystemPackage(),
            new FilePickerPackage(),
            new ReactNativeDocumentPicker(),
            new BarcodeScannerPackage(),
            new AsyncStoragePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
